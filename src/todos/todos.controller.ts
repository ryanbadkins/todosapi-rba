import { Controller, Get, Delete, Param, HttpCode, Put, Res, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoCreate } from './todo-create';
import { response } from 'express';

@Controller('todos')
export class TodosController {

    constructor(private service: TodosService) { }
    @Get()
    async getAllTodos() {
        return await this.service.getAllData();
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param() params) {
        this.service.removeTodo(params.id);
    }

    @Put('completed/:id')
    markComplete(@Param() params, @Res() response) {
        // return 'ok';
        const result = this.service.markComplete(params.id);
        // return result ? response.status(200) : response.status(404);
        if (result) {
            response.status(200).send();
        } else {
            response.status(404).send();
        }
    }

    @Post()
    async addEventListener(@Res() res, @Body() create: TodoCreate) {

        setTimeout(() => {
            if (create.description.match(/laundry/i)) {
                res.status(400).send('You will not do it');
            } else {
                res.status(201).send(this.service.add(create));
            }
        }, 3000);

    }
}
