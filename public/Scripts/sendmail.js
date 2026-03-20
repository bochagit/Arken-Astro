import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm'

emailjs.init({
	publicKey: 'A0-xBpxenC6fp2mYf'
})

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact-form')

	if (!form) return

	const submitBtn = form.querySelector('input[type="submit"]')

	form.addEventListener('submit', (e) => {
		e.preventDefault()

		submitBtn.disabled = true
		submitBtn.value = 'Enviando...'

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
				alert('¡Mensaje enviado!')
				form.reset()
			})
			.catch(() => {
				alert('Error al enviar el mensaje.')
			})
			.finally(() => {
				submitBtn.disabled = false
				submitBtn.value = 'Enviar'
			})
	})
})
