import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VoteTopic } from '../interface/voteTopic';
import { VoteOption } from '../interface/voteOption';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(public http: HttpClient) { }

  createTopic(title: string, description: string, options: string[]) {
    const url = environment.backendUrl + "/VoteTopic";
    this.http.post<{ id: string, title: string, description: string }>(url, {
      title,
      description
    }).subscribe({
      next: (data) => {
        this.http.post(environment.backendUrl + "/VoteOption/" + data.id , {
          options
        }).subscribe()
      },
    })
  }

  getTopics(lastId: number): Observable<VoteTopic[]> {
    return this.http.get<VoteTopic[]>(environment.backendUrl + `/VoteTopic?lastTopicId=${lastId}&amount=10`);
  }

  getOptions(voteTopicId: number): Observable<VoteOption[]> {
    return this.http.get<VoteOption[]>(environment.backendUrl + "/VoteOption/" + voteTopicId);
  }

  vote(voteTopicId: number, options: string[]) {
    options.forEach((option) => {
      this.http.put(environment.backendUrl + `/VoteOption/Vote/${voteTopicId}/${option}`, {}).subscribe();
    })
  }
}