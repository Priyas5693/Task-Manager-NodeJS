const mailgun = require("mailgun-js");
const api_key= process.env.api_key
const DOMAIN= process.env.DOMAIN
const mg = mailgun({apiKey: api_key, domain:DOMAIN})
// const data = {
// 	from: 'Excited User <priyas5693@gmail.com>',
// 	to: 'priya5693.sharma@gmail.com',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// })

const sendWelcomeEmail= (email, name)=>{
	mg.messages().send({
	from: 'Excited User <priya5693.sharma@gmail.com>',
	to: email,
	subject: 'Welcome messages',
	text: `Welcome ${name} to our App!!!`
	})
}

const sendByeEmail =(email, name)=>{
	mg.messages().send({
		from: 'Excited User <priya5693.sharma@gmail.com>',
		to: email,
		subject: 'Goodbye messages',
		text: `Goeodbye!!! ${name}. We are very sad to see you go...`

	})
}

module.exports={
	sendWelcomeEmail,
	sendByeEmail
}