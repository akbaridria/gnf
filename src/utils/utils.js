const baseUrl = 'http://localhost:3300/'

export async function fetchCheckUser(payload){
    const url = `${baseUrl}users/check`
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      return response
}

export async function fetchAddUser(payload){
  const url = `${baseUrl}users/add`
  const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return response
}