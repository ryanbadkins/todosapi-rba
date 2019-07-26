import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as cuid from 'cuid';
import { TodoCreate } from './todo-create';
@Injectable()
export class TodosService {

    private database: TodosResponse = {
        data: [
            { id: '99', description: 'Rake Leaves', completed: true },
            { id: '385', description: 'Clean Steps', completed: false },
            { id: '98', description: 'Build Shed', completed: false },
        ],
    };

    getAllData() {
        return of(this.database).pipe(delay(2500));
    }

    removeTodo(id: string) {
        this.database.data = this.database.data.filter(t => t.id !== id);
    }

    markComplete(id: string) {
        const entity = this.database.data.find(d => d.id === id);
        if (entity) {
            entity.completed = true;
            return true;
        } else {
            return false;
        }
    }

    add(todo: TodoCreate) {
        const newEl = {
            id: cuid(),
            description: todo.description,
            completed: false,
        } as TodosResponseItem;

        this.database.data.unshift(newEl);
        return newEl;
    }

}

export class TodosResponse {
    data: TodosResponseItem[];
}

export class TodosResponseItem {
    id: string;
    description: string;
    completed: boolean;
}
