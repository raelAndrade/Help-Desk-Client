import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ticket } from '../model/ticket.model';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable()
export class TicketService {

  constructor(private http:HttpClient) { }

  /**
   * Esse método cria e atualiza tickets
   * @param ticket 
   */
  createOrUpdate (ticket:Ticket) {
    if (ticket.id != null && ticket.id != '') {
      return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
    }else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(`${HELP_DESK_API}/api/ticket`,ticket);
    }
  }

  /**
   * Esse método exibe todos os tickets
   * @param page 
   * @param count 
   */
  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  /**
   * Esse método busca ticket pelo ID
   * @param id 
   */
  findById(id: string) {
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  /**
   * Esse método deleta ticket
   * @param id 
   */
  delete(id: string) {
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  /**
   * Esse método faz uma pesquisa de tickets por parametros
   * @param page 
   * @param count 
   * @param assignedToMe 
   * @param t 
   */
  findByParams(page: number, count: number, assignedToMe: boolean, t:Ticket) {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == '' ? 'uninformed' : t.title;
    t.status = t.status == '' ? 'uninformed' : t.status;
    t.priority = t.priority == '' ? 'uninformed' : t.priority;
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assignedToMe}/`);
  }

  /**
   * Esse método faz alteração do status do ticket
   * @param status 
   * @param ticket 
   */
  changeStatus (status:string, ticket:Ticket) {
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.id}/${status}`,ticket);
  }

  /**
   * Esse método exibe o resumo dos ticket
   */
  summary () {
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }

}
