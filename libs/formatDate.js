export function dateConverter(mongoDate) {
    const date = new Date(mongoDate);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const [month, day, year] = formattedDate.replace(",", "").split(" ");

    return `${month} ${getDayWithSuffix(day)}, ${year}`;
}

function getDayWithSuffix(day) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export   const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }