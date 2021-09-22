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

export async function fetchAddHistory(payload){
  const url = `${baseUrl}user/history/add`
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

export async function fetchGetUserHistory(payload){
  const url = `${baseUrl}user/history/get`
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

export async function fetchAddTransaction(payload){
  const url = `${baseUrl}users/addTransaction`
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

export async function fetchCheckListingById(payload){
  const url = `${baseUrl}users/transaction/checkListing`
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

export async function fetchAllMarket(payload){
  const url = `${baseUrl}transactions`
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

export function toGateWay(urlGateway){
  const GATEWAY = new URL("https://dweb.link/")
  return new URL(
    `/ipfs/${urlGateway.slice("ipfs://".length)}`,
    GATEWAY)
}

export async function fetchDeleteListing(payload){
  const url = `${baseUrl}users/transaction/deleteListing`
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