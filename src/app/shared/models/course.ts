export interface Course {

  name: string;
  numberOfCandidates: number;
  duration: string;  // days
  topics: TopicInformation[];
  category: string;

}

export interface TopicInformation {
  name: string;
  link: string;
}
