const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog Tech Challenge API",
            version: "1.0.0",
            description: "API para gerenciamento de posts do Tech Challenge"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            schemas: {
                Post: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        titulo: { type: "string", example: "Aprendendo Swagger" },
                        conteudo: { type: "string", example: "Documentando uma API Node.js" },
                        autor: { type: "string", example: "Bruno" }
                    }
                },
                NovoPost: {
                    type: "object",
                    required: ["titulo", "conteudo", "autor"],
                    properties: {
                        titulo: { type: "string", example: "Meu primeiro post" },
                        conteudo: { type: "string", example: "Conteúdo do post" },
                        autor: { type: "string", example: "Bruno" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;