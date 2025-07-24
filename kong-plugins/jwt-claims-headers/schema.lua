local typedefs = require "kong.db.schema.typedefs"

return {
  name = "jwt-claims-headers",
  fields = {
    {
      config = {
        type = "record",
        fields = {
          {
            claims_to_headers = {
              type = "array",
              elements = {
                type = "record",
                fields = {
                  { claim = { type = "string", required = true } },
                  { header = { type = "string", required = true } },
                },
              },
              default = {},
            },
          },
        },
      },
    },
  },
}
