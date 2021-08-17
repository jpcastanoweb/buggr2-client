exports.toDateString = (dateS) => {
  const date = new Date(dateS)
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 8 ? date.getDate() + 1 : "0" + (date.getDate() + 1))
  )
}
