import { Component } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPath: String;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  ngOnInit() {}
  constructor(
    private idle: Idle,
    // private keepalive: Keepalive,
    // private location: Location,
    private router: Router,
    // private activatedRoute: ActivatedRoute,
    private cookieService: CookieService
  ) {
    // for session timeout.

    // sets an idle timeout of 5 seconds, for testing purposes.
    //895 seconds+timeout 5seconds refer for 15mins idle.
    idle.setIdle(895);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      alert('session expired');
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      this.reset();
    });
    idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));
    idle.onTimeoutWarning.subscribe(
      countdown =>
        (this.idleState = 'You will time out in ' + countdown + ' seconds!')
    );

    // sets the ping interval to 15 minutes
    // keepalive.interval(900);

    // keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPath = event.url;
      }

      if (this.currentPath === '/' || this.currentPath === '/login') {
        // idle.watch();
        idle.stop();
      } else idle.watch();
    });
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
