import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('.././home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
            path: 'dashboard',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
            path: 'game-selection',
            loadChildren: () => import('../game-selection/game-selection.module').then( m => m.GameSelectionPageModule)
            },
            {
            path: 'win-lose',
            loadChildren: () => import('../win-lose/win-lose.module').then( m => m.WinLosePageModule)
            },
            {
            path: 'board',
            loadChildren: () => import('../board/board.module').then( m => m.BoardPageModule)
            },
            {
            path: 'profile',
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
            },
            {
            path: 'statistics',
            loadChildren: () => import('../statistics/statistics.module').then( m => m.StatisticsPageModule)
            },
            {
            path: 'practice',
            loadChildren: () => import('../practice/practice.module').then( m => m.PracticePageModule)
            },
            {
            path: 'wallet',
            loadChildren: () => import('../wallet/wallet.module').then( m => m.WalletPageModule)
            },
            {
            path: 'friends',
            loadChildren: () => import('../friends/friends.module').then( m => m.FriendsPageModule)
            },
            {
            path: 'achievements',
            loadChildren: () => import('../achievements/achievements.module').then( m => m.AchievementsPageModule)
            },
            {
            path: 'notifications',
            loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
            },
            {
            path: 'challenges',
            loadChildren: () => import('../challenges/challenges.module').then( m => m.ChallengesPageModule)
            },
            {
                path: 'player-match',
                loadChildren: () => import('../player-match/player-match.module').then( m => m.PlayerMatchPageModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
            },
            {
                path: 'add-money',
                loadChildren: () => import('../add-money/add-money.module').then( m => m.AddMoneyPageModule)
            },
            {
                path: 'custom-battle',
                loadChildren: () => import('../custom-battle/custom-battle.module').then( m => m.CustomBattlePageModule)
            },
            {
                path: 'game-history',
                loadChildren: () => import('../game-history/game-history.module').then( m => m.GameHistoryPageModule)
            },
            {
                path: 'tabs',
                redirectTo: 'tabs/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'tabs',
        redirectTo: 'tabs/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
