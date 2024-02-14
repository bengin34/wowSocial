import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeDifference(dateString: string) {
  const givenTime = moment(dateString);
  const now = moment();
  const duration = moment.duration(now.diff(givenTime));


  const days = Math.floor(duration.asDays());

  if (days >= 1) {
    return `${days} days ago`;
  } else {
    const hours = Math.floor(duration.asHours());
    if (hours >= 1) {
      return `${hours} hours ago`;
    } else {

      const minutes = Math.floor(duration.asMinutes());
      return `${minutes} minutes ago`;
    }
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
