export function saveToLocalStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.log(error)
	}
}

export function getFromLocalStorage(key) {
	try {
		return JSON.parse(localStorage.getItem(key))
	} catch (error) {
		console.log(error)
		if (typeof window !== 'undefined') return localStorage.getItem(key)
	}
}

export function removeStorage(item) {
	localStorage.removeItem(item)
}

export function removeAllStorage(props) {
	props.forEach((item) => removeStorage(item))
}

export function clearStorage() {
	localStorage.clear()
}
