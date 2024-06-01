export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

export const PRIOTITYSTYELS = {
  high: "text-[#DC3545]",//red
  medium: "text-[#FFC107]",//yellow
  low: "text-[#28A745]",//green
};

export const TASK_TYPE = {
  "in progress": "bg-[#FFC107]",//yellow
  completed: "bg-[#28A745]",//green
};

export const BGS = [
  "bg-[#007BFF]",//blue
  "bg-[#FFC107]",//yellow
  "bg-[#DC3545]",//red
  "bg-[#28A745]",//green
];
