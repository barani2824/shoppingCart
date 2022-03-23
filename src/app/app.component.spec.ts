import { TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductCatalogComponent } from './components/product/catalog/product-catalog.component';
import { RoleGuard } from './guard/role-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Constants } from './shared/constants';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialogModule,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

export class TestGlobalConstants {
  public static appTestRoutes: Routes = [
    {
      path: '', component: ProductCatalogComponent, canActivate: [RoleGuard],
      data: {
        expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
      }
    },
    { path: 'login', component: LoginComponent },
  ];
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule.withRoutes(TestGlobalConstants.appTestRoutes)
      ],
      providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Hardware Application'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hardware Application');
  });

});
