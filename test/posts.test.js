const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const Post = require('../src/modules/posts/domain/entities/Post');
const ValidationError = require('../src/shared/errors/ValidationError');
const base = '../src/modules/posts/application/use-cases/';
const valid = { titulo: 'Título', conteudo: 'Conteúdo', autor: 'Autor' };
let calls = 0;
let fail = false;
const repository = {};
for (const method of ['findAll', 'findById', 'create', 'update', 'delete']) {
    repository[method] = async (id, data) => {
        calls++;
        if (fail) throw new Error('SQL: credencial privada');
        if (method === 'findAll') return [{ id: 1, ...valid }];
        if (method === 'create') return { ...id, id: 1 };
        if (id === 2) return undefined;
        return { id, ...(data || valid) };
    };
}
// Substituir apenas o container: as rotas, controllers e casos de uso reais são exercitados.
const containerPath = require.resolve('../src/container/postsContainer');
require.cache[containerPath] = { id: containerPath, filename: containerPath, loaded: true, exports: {
    listarPostsUseCase: new (require(base + 'ListarPostsUseCase'))(repository),
    buscarPostPorIdUseCase: new (require(base + 'BuscarPostPorIdUseCase'))(repository),
    criarPostUseCase: new (require(base + 'CriarPostUseCase'))(repository),
    editarPostUseCase: new (require(base + 'EditarPostUseCase'))(repository),
    excluirPostUseCase: new (require(base + 'ExcluirPostUseCase'))(repository)
} };
let server;
let url;
before(async () => {
    const app = express();
    app.use(express.json());
    app.use(require('../src/modules/posts/presentation/routes/postsRoutes'));
    app.use(require('../src/shared/middlewares/errorHandler'));
    server = await new Promise((resolve, reject) => { const s = app.listen(0, '127.0.0.1', error => error ? reject(error) : resolve(s)); s.on('error', reject); });
    url = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { if (server) await new Promise(resolve => server.close(resolve)); });
async function request(method, path, body) {
    const response = await fetch(url + path, { method, headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    return { status: response.status, body: await response.json() };
}
test('CRUD preserva status e respostas de sucesso', async () => {
    assert.deepEqual(await request('GET', '/posts'), { status: 200, body: [{ id: 1, ...valid }] });
    for (const method of ['GET', 'PUT']) assert.deepEqual(await request(method, '/posts/1', method === 'PUT' ? valid : undefined), { status: 200, body: { id: 1, ...valid } });
    assert.deepEqual(await request('POST', '/posts', { titulo: ' Título ', conteudo: ' Conteúdo ', autor: ' Autor ', extra: true }), { status: 201, body: { id: 1, ...valid } });
    assert.deepEqual(await request('DELETE', '/posts/1'), { status: 200, body: { mensagem: 'Post removido com sucesso' } });
});
test('GET, PUT e DELETE inexistentes retornam 404', async () => {
    for (const method of ['GET', 'PUT', 'DELETE']) assert.deepEqual(await request(method, '/posts/2', method === 'PUT' ? valid : undefined), { status: 404, body: { mensagem: 'Post não encontrado' } });
});
test('IDs inválidos não acessam repositório', async () => {
    const count = calls;
    for (const id of ['0', '-1', '1.2', 'abc', '1e2', '+1', '2147483648']) {
        for (const method of ['GET', 'PUT', 'DELETE']) assert.equal((await request(method, '/posts/' + id, method === 'PUT' ? valid : undefined)).status, 400);
    }
    assert.equal(calls, count);
    assert.equal((await request('GET', '/posts/2147483647')).status, 200);
});
test('corpos inválidos e campos inválidos não acessam repositório', async () => {
    const count = calls;
    for (const method of ['POST', 'PUT']) {
        const path = method === 'POST' ? '/posts' : '/posts/1';
        for (const body of [undefined, null, [], 'texto', 1]) assert.equal((await request(method, path, body)).status, 400);
        for (const campo of Object.keys(valid)) {
            for (const value of [undefined, null, '', '  ', 42, false, {}, []]) assert.equal((await request(method, path, { ...valid, [campo]: value })).status, 400);
            const body = { ...valid }; delete body[campo];
            assert.deepEqual((await request(method, path, body)).body, { mensagem: 'Campos obrigatórios não informados.', camposFaltando: [campo] });
        }
        assert.deepEqual((await request(method, path, {})).body.camposFaltando, ['titulo', 'conteudo', 'autor']);
        for (const [campo, limite] of [['titulo', 255], ['autor', 100]]) assert.equal((await request(method, path, { ...valid, [campo]: 'a'.repeat(limite + 1) })).status, 400);
    }
    assert.equal(calls, count);
});
test('entidade valida tipos, espaços, limites e Unicode', () => {
    assert.throws(() => new Post(), ValidationError);
    for (const campo of Object.keys(valid)) for (const value of [null, '', ' ', 1, false, {}, []]) assert.throws(() => new Post({ ...valid, [campo]: value }), ValidationError);
    for (const [campo, limite] of [['titulo', 255], ['autor', 100]]) {
        assert.equal(new Post({ ...valid, [campo]: '😀'.repeat(limite) })[campo], '😀'.repeat(limite));
        assert.throws(() => new Post({ ...valid, [campo]: 'a'.repeat(limite + 1) }), ValidationError);
    }
});
test('JSON malformado retorna 400 sem acessar persistência', async () => {
    const count = calls;
    const response = await fetch(url + '/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { mensagem: 'Corpo JSON inválido.' });
    assert.equal(calls, count);
});
test('falhas de persistência retornam 500 genérico', async t => {
    t.mock.method(console, 'error', () => {});
    fail = true;
    try {
        for (const [method, path, body] of [['GET', '/posts'], ['GET', '/posts/1'], ['POST', '/posts', valid], ['PUT', '/posts/1', valid], ['DELETE', '/posts/1']]) assert.deepEqual(await request(method, path, body), { status: 500, body: { mensagem: 'Erro interno do servidor' } });
    } finally { fail = false; }
});
