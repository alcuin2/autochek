import { Injectable } from '@nestjs/common';
import axios from "axios";
import collect from 'collect.js';

@Injectable()
export class AppService {

  private baseUrl = "https://hacker-news.firebaseio.com/v0/";


  private async sendRequests(urls){
     // Parallel calls
    const responses: any = await axios.all(urls.map(url => axios.get(url)))
    return responses.map(response => response.data);
  }


  private count(data, count?: number) {
    if (!count){
      count = 10
    }
    let listOfWords = [];
    data.forEach((story) => {
         let titleWords = story.title.split(" ")
         titleWords.forEach(word => {
           let cleanedWord = word.replace(/[^a-zA-Z ]/g, "").toLowerCase(); // remove all special characters and convert to lowercase
           // let cleanedWord = word.toLowerCase()
           if (["", "that", "the", "you", "and", "for", "from", "its"].includes(cleanedWord)){
             return // skip
           }
           if (cleanedWord.length <= 2) {
             return //remove all 2 letter words like 'to' 'we' etc, 
           }
           listOfWords.push(cleanedWord)
         })
    })

    let collection = collect(listOfWords);
    const counted = collection.countBy();
    let lists = [];
    for (const [key, value] of Object.entries(counted.all())) {
      lists.push({word: key, occurrence:value})
    }
    collection = collect(lists);
    return collection.sortByDesc('occurrence').slice(0, count);
  }


  async getHome(): Promise<string> {
    return await 'Autochek test project';
  }


  async getTopWordsInStoriesTitle(stories: number, count: number){
    
    try {
      let storyURLs = []
      const response = await axios.get(this.baseUrl + 'newstories.json');
      const storyIds = response.data.slice(0, stories);
      storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);

      let data = await this.sendRequests(storyURLs)
      return this.count(data, count);
       
    } catch(err) {
      console.log(err)
    }
  }

  async getTopWordsInStoriesTitleWeekly(week: number, count: number){
    let days = week * 7;
    let unixTimestamp =  Math.floor(new Date((new Date()).getTime() - (days * 24 * 60 * 60 * 1000)).getTime() / 1000) ;
    try {
       const response = await axios.get(this.baseUrl + 'newstories.json');
       const storyIds = response.data;
       const storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);
       let data = await this.sendRequests(storyURLs)
       // console.log(data)
       const collection = collect(data);
       const filtered = collection.where('time', '>=', unixTimestamp); 
       return this.count(filtered.all(), count);
    } catch(err) {
      console.log(err)
    }
  }


  async getStoriesOfUsers(stories: number, karma: number){
    try {
       const response = await axios.get(this.baseUrl + 'newstories.json');
       const storyIds = response.data.slice(0, stories);
       const storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);

       const storiesData = await this.sendRequests(storyURLs);
       
       const users = storiesData.map(story => story.by);
       
       const userURLs = users.map(user => this.baseUrl + `user/${user}.json`);
       console.log("here")
       const userData = await this.sendRequests(userURLs);
       const filteredStories = storiesData.filter((story, index) => userData[index].karma > karma) // filter stories with user karma
       
       return this.count(filteredStories)

    } catch(err){
      console.log(err)
    }
  }
}
