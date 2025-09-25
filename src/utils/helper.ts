export function delay() {
  return new Promise((res) => setTimeout(res, 1000));
}
export function truncateString(text: string, length: number) {
  return text?.length > length ? `${text.substring(0, length)}...` : text;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    // For today, show the time
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Format file size to human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const logFormDataKeysValues = (formData: FormData) => {
  // Display the key/value pairs
  console.log(
    "🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻 FormData keys/values: 🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻"
  );
  for (const pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
};
