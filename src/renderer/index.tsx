import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Sidebar, SidebarProps } from './components/Sidebar';
import DragRegion from './components/DragRegion';
import Home from './routes/Home';

import './styles/index.scss';

const routes: SidebarProps = {
    routes: [
        {
            route: '/',
            name: 'Home',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADu0lEQVR4nO2azW8NURjGf/f2pqFUE4kF8bXRlaiS1F8gxMZWW4QNCRuxYEWaLiQWNBK0GlRRtbGww0ZaIeyErlD2WnRjg/ZanDnpmdP5OHPunbkz03mSkzv3vHPe8z7Pec/HTAYKFChQoECBAgUKNBQ7gCngo3O9rNABzABVp/wEdjc0ogShk19WIujkfzlF/p8hx9NBJz8H7AF2AT/IeSb4kZfItQhh5CVyKYIpeYlcibATmMW94HUp9hLQ45SSUt9FDhZGnbw+8iXghmK/DZQVe6YzISr5XIlgSz4XInTiDlaf82VgGDfhQaeodcO4RdDXhO+kcE2wGXlJtARc12x3yFAmmJC/SfAoZ1YEW/IlliJzItSTvNomEyJ0Un/yaltdhLukSAQT8vrKfgsz8qqPVIqQBHnVV6pE0Pf5OMmrPnURRmiACCbkh7RAh6iNvOpbF+ER0KTcE6sIYeTLiFGJg7yElwjjJCCC7tSL/D3iJS+RuAhpIi/hJ0IlIG4rEWzIDxIveQkbESI9QNmQHyAZ8hKxibAV96PnHO5H2iZglMaSl/Dadu/jXhO6EBxUEdYHOe3WHPYrtiangzSQlyhp8XiJ0K/ZDwQF3AK8ZHHU54FjiPQaAY4o9w4AZw0DbQcO4j7ABGEBeAp8Mri36lH3EBF3N2K6SkEmgL1hDtuAdywq9g+YxK3iVYPAVEyzdKTCyhdD337tJ53Y5f8JYJVpwLoIarli6sQgyLAS1bd+GrUiL9EGvNUcRR15ryDjFMBrd3gFtFrGTRsilRaAS7ZOSE4AECJcc/6/wGLkvVCrkyQFkFjt16AR25YpGR0msaq+jbiZbkVBaEdsge118JVJyG2t1q0qzingi3pMgahpl7spkGksewEq4bcEYlMNbReAMee6l4wNxkbEA4p6vo66UI0qdfqTZWKLoE0GdALPgXUWbVWUfK5TjTWI7U6q/Bf7UZoHHjhlngZlQFScUTqYRWRDLUE2/BwQBVuAD0oHRy07zZwAm4FniFVb7WCtZaeZEqAD99tUWdRjbxoEaAH6tPv7gJWGMXmiFfisOPwDPAEuANt8CJmg3gKsAN74tHnt2K1wSnE0g/gKJIyQCeotQF9Iu4tBwVQQJ7BeYINmO65cvwf2OSUI50PstcDP9wnl+hzia5TTwGWn7iTwDXHqXEDw7XFsYyBWc9tRSVtpdog1e9jka/zDSl1vGfPUTTumEesUzu9Xze7Js4JIgyqwPbbQ4sdv4LFWtx84hHiHOYX4kAIW+VaB8f8AMEVqPy1dlgAAAABJRU5ErkJggg=='
        },
        {
            route: '/inventory',
            name: 'Home',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADu0lEQVR4nO2azW8NURjGf/f2pqFUE4kF8bXRlaiS1F8gxMZWW4QNCRuxYEWaLiQWNBK0GlRRtbGww0ZaIeyErlD2WnRjg/ZanDnpmdP5OHPunbkz03mSkzv3vHPe8z7Pec/HTAYKFChQoECBAgUKNBQ7gCngo3O9rNABzABVp/wEdjc0ogShk19WIujkfzlF/p8hx9NBJz8H7AF2AT/IeSb4kZfItQhh5CVyKYIpeYlcibATmMW94HUp9hLQ45SSUt9FDhZGnbw+8iXghmK/DZQVe6YzISr5XIlgSz4XInTiDlaf82VgGDfhQaeodcO4RdDXhO+kcE2wGXlJtARc12x3yFAmmJC/SfAoZ1YEW/IlliJzItSTvNomEyJ0Un/yaltdhLukSAQT8vrKfgsz8qqPVIqQBHnVV6pE0Pf5OMmrPnURRmiACCbkh7RAh6iNvOpbF+ER0KTcE6sIYeTLiFGJg7yElwjjJCCC7tSL/D3iJS+RuAhpIi/hJ0IlIG4rEWzIDxIveQkbESI9QNmQHyAZ8hKxibAV96PnHO5H2iZglMaSl/Dadu/jXhO6EBxUEdYHOe3WHPYrtiangzSQlyhp8XiJ0K/ZDwQF3AK8ZHHU54FjiPQaAY4o9w4AZw0DbQcO4j7ABGEBeAp8Mri36lH3EBF3N2K6SkEmgL1hDtuAdywq9g+YxK3iVYPAVEyzdKTCyhdD337tJ53Y5f8JYJVpwLoIarli6sQgyLAS1bd+GrUiL9EGvNUcRR15ryDjFMBrd3gFtFrGTRsilRaAS7ZOSE4AECJcc/6/wGLkvVCrkyQFkFjt16AR25YpGR0msaq+jbiZbkVBaEdsge118JVJyG2t1q0qzingi3pMgahpl7spkGksewEq4bcEYlMNbReAMee6l4wNxkbEA4p6vo66UI0qdfqTZWKLoE0GdALPgXUWbVWUfK5TjTWI7U6q/Bf7UZoHHjhlngZlQFScUTqYRWRDLUE2/BwQBVuAD0oHRy07zZwAm4FniFVb7WCtZaeZEqAD99tUWdRjbxoEaAH6tPv7gJWGMXmiFfisOPwDPAEuANt8CJmg3gKsAN74tHnt2K1wSnE0g/gKJIyQCeotQF9Iu4tBwVQQJ7BeYINmO65cvwf2OSUI50PstcDP9wnl+hzia5TTwGWn7iTwDXHqXEDw7XFsYyBWc9tRSVtpdog1e9jka/zDSl1vGfPUTTumEesUzu9Xze7Js4JIgyqwPbbQ4sdv4LFWtx84hHiHOYX4kAIW+VaB8f8AMEVqPy1dlgAAAABJRU5ErkJggg=='
        },
        {
            route: '/link',
            name: 'Home',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADu0lEQVR4nO2azW8NURjGf/f2pqFUE4kF8bXRlaiS1F8gxMZWW4QNCRuxYEWaLiQWNBK0GlRRtbGww0ZaIeyErlD2WnRjg/ZanDnpmdP5OHPunbkz03mSkzv3vHPe8z7Pec/HTAYKFChQoECBAgUKNBQ7gCngo3O9rNABzABVp/wEdjc0ogShk19WIujkfzlF/p8hx9NBJz8H7AF2AT/IeSb4kZfItQhh5CVyKYIpeYlcibATmMW94HUp9hLQ45SSUt9FDhZGnbw+8iXghmK/DZQVe6YzISr5XIlgSz4XInTiDlaf82VgGDfhQaeodcO4RdDXhO+kcE2wGXlJtARc12x3yFAmmJC/SfAoZ1YEW/IlliJzItSTvNomEyJ0Un/yaltdhLukSAQT8vrKfgsz8qqPVIqQBHnVV6pE0Pf5OMmrPnURRmiACCbkh7RAh6iNvOpbF+ER0KTcE6sIYeTLiFGJg7yElwjjJCCC7tSL/D3iJS+RuAhpIi/hJ0IlIG4rEWzIDxIveQkbESI9QNmQHyAZ8hKxibAV96PnHO5H2iZglMaSl/Dadu/jXhO6EBxUEdYHOe3WHPYrtiangzSQlyhp8XiJ0K/ZDwQF3AK8ZHHU54FjiPQaAY4o9w4AZw0DbQcO4j7ABGEBeAp8Mri36lH3EBF3N2K6SkEmgL1hDtuAdywq9g+YxK3iVYPAVEyzdKTCyhdD337tJ53Y5f8JYJVpwLoIarli6sQgyLAS1bd+GrUiL9EGvNUcRR15ryDjFMBrd3gFtFrGTRsilRaAS7ZOSE4AECJcc/6/wGLkvVCrkyQFkFjt16AR25YpGR0msaq+jbiZbkVBaEdsge118JVJyG2t1q0qzingi3pMgahpl7spkGksewEq4bcEYlMNbReAMee6l4wNxkbEA4p6vo66UI0qdfqTZWKLoE0GdALPgXUWbVWUfK5TjTWI7U6q/Bf7UZoHHjhlngZlQFScUTqYRWRDLUE2/BwQBVuAD0oHRy07zZwAm4FniFVb7WCtZaeZEqAD99tUWdRjbxoEaAH6tPv7gJWGMXmiFfisOPwDPAEuANt8CJmg3gKsAN74tHnt2K1wSnE0g/gKJIyQCeotQF9Iu4tBwVQQJ7BeYINmO65cvwf2OSUI50PstcDP9wnl+hzia5TTwGWn7iTwDXHqXEDw7XFsYyBWc9tRSVtpdog1e9jka/zDSl1vGfPUTTumEesUzu9Xze7Js4JIgyqwPbbQ4sdv4LFWtx84hHiHOYX4kAIW+VaB8f8AMEVqPy1dlgAAAABJRU5ErkJggg=='
        },
        {
            route: '/settings',
            name: 'Home',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADu0lEQVR4nO2azW8NURjGf/f2pqFUE4kF8bXRlaiS1F8gxMZWW4QNCRuxYEWaLiQWNBK0GlRRtbGww0ZaIeyErlD2WnRjg/ZanDnpmdP5OHPunbkz03mSkzv3vHPe8z7Pec/HTAYKFChQoECBAgUKNBQ7gCngo3O9rNABzABVp/wEdjc0ogShk19WIujkfzlF/p8hx9NBJz8H7AF2AT/IeSb4kZfItQhh5CVyKYIpeYlcibATmMW94HUp9hLQ45SSUt9FDhZGnbw+8iXghmK/DZQVe6YzISr5XIlgSz4XInTiDlaf82VgGDfhQaeodcO4RdDXhO+kcE2wGXlJtARc12x3yFAmmJC/SfAoZ1YEW/IlliJzItSTvNomEyJ0Un/yaltdhLukSAQT8vrKfgsz8qqPVIqQBHnVV6pE0Pf5OMmrPnURRmiACCbkh7RAh6iNvOpbF+ER0KTcE6sIYeTLiFGJg7yElwjjJCCC7tSL/D3iJS+RuAhpIi/hJ0IlIG4rEWzIDxIveQkbESI9QNmQHyAZ8hKxibAV96PnHO5H2iZglMaSl/Dadu/jXhO6EBxUEdYHOe3WHPYrtiangzSQlyhp8XiJ0K/ZDwQF3AK8ZHHU54FjiPQaAY4o9w4AZw0DbQcO4j7ABGEBeAp8Mri36lH3EBF3N2K6SkEmgL1hDtuAdywq9g+YxK3iVYPAVEyzdKTCyhdD337tJ53Y5f8JYJVpwLoIarli6sQgyLAS1bd+GrUiL9EGvNUcRR15ryDjFMBrd3gFtFrGTRsilRaAS7ZOSE4AECJcc/6/wGLkvVCrkyQFkFjt16AR25YpGR0msaq+jbiZbkVBaEdsge118JVJyG2t1q0qzingi3pMgahpl7spkGksewEq4bcEYlMNbReAMee6l4wNxkbEA4p6vo66UI0qdfqTZWKLoE0GdALPgXUWbVWUfK5TjTWI7U6q/Bf7UZoHHjhlngZlQFScUTqYRWRDLUE2/BwQBVuAD0oHRy07zZwAm4FniFVb7WCtZaeZEqAD99tUWdRjbxoEaAH6tPv7gJWGMXmiFfisOPwDPAEuANt8CJmg3gKsAN74tHnt2K1wSnE0g/gKJIyQCeotQF9Iu4tBwVQQJ7BeYINmO65cvwf2OSUI50PstcDP9wnl+hzia5TTwGWn7iTwDXHqXEDw7XFsYyBWc9tRSVtpdog1e9jka/zDSl1vGfPUTTumEesUzu9Xze7Js4JIgyqwPbbQ4sdv4LFWtx84hHiHOYX4kAIW+VaB8f8AMEVqPy1dlgAAAABJRU5ErkJggg=='
        },
    ]
}

ReactDOM.render(
    <div className="App">
        <Router>
            <Sidebar {...routes} />
            <DragRegion />
            <Route exact path="/" component={Home} />
            <Route exact path="/link" component={Home} />
        </Router>
    </div>,
    document.getElementById('app')
)