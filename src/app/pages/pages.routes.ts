import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { Users } from './crud/users';
import { Places } from './crud/places';
import { MiniLines } from './crud/mini-lines';
import { Reports } from './crud/reports';
import { Comments } from './crud/comments';


export default [
    { path: 'users', component: Users },
    { path: 'places', component: Places },
    { path: 'minis', component: MiniLines },
    { path: 'comentarios', component: Comments },
    { path: 'reportes', component: Reports },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: 'panding' }
] as Routes;
