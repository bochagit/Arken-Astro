import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm'

emailjs.init({
	publicKey: 'A0-xBpxenC6fp2mYf'
})

const messages = {
	es: {
		sending: 'Enviando...',
		success: '¡Mensaje enviado!',
		error: 'Error al enviar el mensaje.'
	},
	en: {
		sending: 'Sending...',
		success: 'Message sent!',
		error: 'Error sending message.'
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact-form')

	if (!form) return

	const lang = form.dataset.lang || 'es'
	const msgs = messages[lang] || messages.es
	const submitBtn = form.querySelector('input[type="submit"]')
	const originalValue = submitBtn.value

	form.addEventListener('submit', (e) => {
		e.preventDefault()

		submitBtn.disabled = true
		submitBtn.value = msgs.sending

		const parms = {
			name: document.getElementById('name').value,
			company: document.getElementById('company').value,
			tel: document.getElementById('tel').value,
			email: document.getElementById('email').value,
			message: document.getElementById('message').value
		}

		emailjs
			.send('service_ddht0l6', 'template_8mbch1a', parms)
			.then(() => {
				alert(msgs.success)
				form.reset()
			})
			.catch(() => {
				alert(msgs.error)
			})
			.finally(() => {
				submitBtn.disabled = false
				submitBtn.value = originalValue
			})
	})
})

