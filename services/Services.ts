import { NedResponse } from './interfaces';

const getNextRaces = (count: number = 50) => {
  let url: string = `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${count}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(json => {
      let res = json as NedResponse
      let data = res.data
      return data?.race_summaries
    })
}

export {
  getNextRaces
}