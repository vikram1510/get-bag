import twilio from 'twilio'
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


export function sendMessage(message: string){
    return client.messages.create({
       body: 'wannakum?',
       from: '+441704320257',
       to: '+447480519119'
     })

}
