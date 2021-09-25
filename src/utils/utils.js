const baseUrl = 'http://localhost:3300/'

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

export async function fetchUserByWalletAddress(payload){
  const url = `${baseUrl}user/getByUserWallet`
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

export async function fetchUserHistory(payload){
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

export async function fetchCheckStatusListing(payload){
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

export async function fetchAllListing(payload){
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


export async function fetchDeleteUser(payload){
  const url = `${baseUrl}users/delete`
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


export async function fetchDeletListing(payload){
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
export function toGateWay(urlGateway){
  const GATEWAY = new URL("https://dweb.link/")
  return new URL(
    `/ipfs/${urlGateway.slice("ipfs://".length)}`,
    GATEWAY)
}

