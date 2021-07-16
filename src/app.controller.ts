import { Controller, Get, Param, ParseIntPipe, DefaultValuePipe, } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHome(): Promise<string> {
    return await this.appService.getHome();
  }

  @Get('topwordstitle/:num_stories?/:count?')
  async getTopWordsInStoriesTitle(
    @Param('num_stories', new DefaultValuePipe(25), ParseIntPipe) num_stories: number, 
    @Param('count', new DefaultValuePipe(10),  ParseIntPipe) count: number) {

    return await this.appService.getTopWordsInStoriesTitle(num_stories, count);

  }

  @Get('topwordstitleweek/:week?/:count?')
  async getTopWordsInStoriesTitleWeekly(
    @Param('week', new DefaultValuePipe(1)) week: number,
    @Param('count', new DefaultValuePipe(10)) count: number){

    return await this.appService.getTopWordsInStoriesTitleWeekly(week, count)
  }

  @Get('userstories/:num_stories?/:karma?')
  async getStoriesOfUsers(
    @Param('num_stories', new DefaultValuePipe(600), ParseIntPipe) num_stories: number,
    @Param('karma', new DefaultValuePipe(10), ParseIntPipe) karma: number
    ) {
    return await this.appService.getStoriesOfUsers(num_stories, karma)
  }
}
