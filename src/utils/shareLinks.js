const generateShareLinks = (eventId) => {
   const eventUrl = `https://eventful.com/events/${eventId}`

   return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(eventUrl)}`,

      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
         eventUrl,
      )}`,

      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}`,
   }
}

module.exports = generateShareLinks
