import {Inject, Injectable} from '@angular/core';
import {StompConfig, StompRService} from '@stomp/ng2-stompjs';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SocksConfig} from './config/socks-config';

@Injectable({
  providedIn: 'root'
})
export class WrappedSocketService {

  constructor(
    @Inject('config') private configArgs: SocksConfig,
    private stompService: StompRService
  ) {
    this.connect();
  }

  connect(): void {
    if (!this.stompService.connected()) {
      this.stompService.config = this.config();
      this.stompService.initAndConnect();
    }
  }

  disconnect(): void {
    if (this.stompService.connected()) {
      this.stompService.disconnect();
    }
  }

  emit(eventName: string, payload: any): void {
    this.stompService.publish(eventName, JSON.stringify(payload));
  }

  fromEvent<T>(eventName: string): Observable<T> {
    return this.stompService.subscribe(eventName)
      .pipe(map((message: any) => {
        return message.body
      }));
  }

  private config(): StompConfig {
    const config: StompConfig = new StompConfig();
    config.url = this.configArgs.url
    config.heartbeat_in = this.configArgs.options.heartbeat_in || 0;
    config.heartbeat_out = this.configArgs.options.heartbeat_out || 0;
    config.reconnect_delay = this.configArgs.options.reconnect_delay || 10000;
    return config;
  }
}
