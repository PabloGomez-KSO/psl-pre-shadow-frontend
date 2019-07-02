export interface Course {

  name: string;
  numberOfCandidates: string;
  duration: number;  // days
  topics: TopicInformation[]

}

export interface TopicInformation {
  name: string;
  link: string;
}
