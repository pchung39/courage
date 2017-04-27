
const getVisibleEntries = (entries, filter) => {
  switch (filter) {
    case 'all':
      return entries
    case 'romance':
      return entries.filter(e => e.category === "romance")
    case 'family':
      return entries.filter(e => e.category === "family")
    case 'friends':
      return entries.filter(e => e.category === "friends")
    case 'career':
      return entries.filter(e => e.category === "career")
    default:
      return entries;
  }
}

export default getVisibleEntries;
