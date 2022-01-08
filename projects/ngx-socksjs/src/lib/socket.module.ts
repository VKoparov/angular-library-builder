import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SocksConfig} from './config/socks-config'
import {WrappedSocketService} from './wrapped-socket.service';
import { StompRService } from '@stomp/ng2-stompjs';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [ StompRService ]
})
export class SocketModule {
  public static forRoot(config: SocksConfig): ModuleWithProviders<SocketModule> {
    return {
      ngModule: SocketModule,
      providers: [
        WrappedSocketService,
        { provide: 'config', useValue: config }
      ]
    }
  }
}
