export const addContactToNewsletter = async (email: string) => {
  return await fetch('https://us-central1-waller-development.cloudfunctions.net/addContactToNewsletter',
    {
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
  })
}