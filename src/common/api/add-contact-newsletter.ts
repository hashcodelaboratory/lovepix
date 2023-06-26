export const addContactToNewsletter = async (email: string) => {
  return await fetch('/api/smart-emailing/register',
    {
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
  })
}