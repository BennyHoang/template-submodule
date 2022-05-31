import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UserTokenService } from 'src/app/core/auth/user-token.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinancingApiService } from 'src/app/core/http/financing-api.service';
import { IFrontendConfigRequest } from 'src/app/models/endpoints';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTitle: string;
  userName: string;
  userToken: string;
  headerAppUrls: IFrontendConfigRequest[];
  @Input() drawer: MatDrawer;
  constructor(
    private userTokenService: UserTokenService,
    private titleService: Title,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private financingApiService: FinancingApiService
  ) {}

  ngOnInit(): void {
    this.getHeaderUrls();

    let environemntText;

    switch (environment.environemnt) {
      case 'dev':
        environemntText = 'dev';
        break;
      case 'test':
        environemntText = 'test';
        break;
      case 'prod':
        environemntText = '';
        break;
      default:
        environemntText = 'local';
        break;
    }
    this.headerTitle = environment.APP_AME;
    this.titleService.setTitle(`${environment.APP_AME} - ${environemntText}`);
    if (localStorage.getItem('userToken') === null) {
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    }
    this.userName = this.userTokenService.getUserName();
    this.userToken = this.userTokenService.getAccessToken();
  }
  snackBarMessage(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 5000,
    });
  }
  copyToClipboard() {
    const expired = this.userTokenService.tokenExpired();
    if (expired) {
      console.log('expired, fetching new headers');
      this.financingApiService
        .getConfigData()
        .pipe(
          finalize(() => {
            this.snackBarMessage('user token copied');
            const refreshedToken = this.userTokenService.getAccessToken();
            this.clipboard.copy(
              this.userTokenService.stringifyAccessToken(refreshedToken)
            );
          })
        )
        .subscribe();
      return;
    }
    console.log('not expired, using same token');
    this.clipboard.copy(
      this.userTokenService.stringifyAccessToken(this.userToken)
    );
    this.snackBarMessage('user token copied');
  }
  getHeaderColor(): string {
    return environment.environmentColor;
  }
  getHeaderUrls() {
    this.financingApiService
      .getConfigData()
      .subscribe((data: IFrontendConfigRequest[]) => {
        this.headerAppUrls = data;
      });
  }
  navigateToApp(url: string) {
    location.href = url;
  }
}
