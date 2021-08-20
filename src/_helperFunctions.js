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
  "Testing",
  "Delivered",
  "Maintenance",
]

exports.OPP_STAGES_WITH_VALUES = {
  New: 1,
  Discovery: 2,
  Proposal: 3,
  Negotiation: 4,
  "Closed - Won": 5,
  "Closed - Lost": 6,
}

exports.PROJECT_STAGES_WITH_VALUES = {
  Analysis: 1,
  Design: 2,
  Implementation: 3,
  Testing: 4,
  Delivered: 5,
  Maintenance: 6,
}

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

exports.toDollarString = (val) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  return formatter.format(val)
}
