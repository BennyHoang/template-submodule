import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserTokenService } from 'src/app/core/auth/user-token.service';
import { FinancingApiService } from 'src/app/core/http/financing-api.service';
import { accessToken } from 'src/app/models/accessToken';

@Component({
  selector: 'app-wrong-role',
  templateUrl: './wrong-role.component.html',
  styleUrls: ['./wrong-role.component.scss'],
})
export class WrongRoleComponent implements OnInit {
  tokenData: accessToken = {};
  constructor(
    private financingApiService: FinancingApiService,
    private userTokenService: UserTokenService,
    private router: Router
  ) {
    this.tokenData = JSON.parse(localStorage.getItem('userToken') || '{}');
  }

  ngOnInit(): void {
    if (Object.keys(this.tokenData).length === 0) {
      this.financingApiService
        .getConfigData()
        .pipe(
          finalize(() => {
            const canView =
              this.userTokenService.restrictResourceBasedOnUserRole({
                roles: ['nbim'],
              });
            if (canView) {
              if (localStorage.getItem('previousUrl') !== null) {
                this.router.navigateByUrl(
                  localStorage.getItem('previousUrl') || ''
                );
              } else {
                this.router.navigate(['/']);
              }
            }
          })
        )
        .subscribe();
    }
  }
}
