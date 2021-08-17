exports.OPP_STAGES = [
  "New",
  "Discovery",
  "Proposal",
  "Negotiation",
  "Closed - Won",
  "Closed - Lost",
]

exports.PROJECT_STAGES = [
  "Analysis",
  "Design",
  "Implementation",
  "Negotiation",
  "Testing",
  "Delivered",
  "Maintenance",
]

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
