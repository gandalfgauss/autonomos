const env = process.env.NODE_ENV || "dev";

const config = ()=>{
    switch(env){
        case "dev":
        
        return {
            bd_string: 'mongodb+srv://usuario_admin:7608237801@autonomos.omo8xeb.mongodb.net/?retryWrites=true&w=majority',
            accountSid: "AC2585bb2fa517031f6c509b81dcf6ee88",
            authToken: "5108ce635714f54aaf26bd4581171f8e",
        }

        case "hml":
        return {
            bd_string: 'mongodb+srv://usuario_admin:7608237801@autonomos.omo8xeb.mongodb.net/?retryWrites=true&w=majority',
            accountSid: "AC2585bb2fa517031f6c509b81dcf6ee88",
            authToken: "a935d0c4cd7b30614a4428041cfc15f5",
        }

        case "prod":
        return {
            bd_string: 'mongodb+srv://usuario_admin:7608237801@autonomos.omo8xeb.mongodb.net/?retryWrites=true&w=majority',
            accountSid: "AC2585bb2fa517031f6c509b81dcf6ee88",
            authToken: "a935d0c4cd7b30614a4428041cfc15f5",
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`)

module.exports = config()