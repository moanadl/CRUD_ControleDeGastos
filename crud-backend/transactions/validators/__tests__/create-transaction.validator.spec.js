import { validateTransaction } from "../create-transaction.validator";
import { BadRequestError } from "../../errors/bad-request.error";

describe ('Create transaction validator', () => {

    let request;
    let response;

    beforeEach(() => {
        request = { body: { 
            date: '2030-01-01',
            money: {
                currency: 'anyCurrency',
                value: 100
            },
            transactionType: 'anyTransactionType',
            type: 'income'
        }};
        response = new ResponseMock();
    });

    test ('given date not informed, then return 400 error', () => {     
        request.body.date = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given date not informed, then return error', () => {
        request.body.date = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given invalid date, then return 400 error', () => {
        request.body.date = 'invalidDate'      
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given invalid date, then return error', () => {
        request.body.date = 'invalidDate'      
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given money not informed, then return 400 error', () => {     
        request.body.money = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given money not informed, then return error', () => {
        request.body.money = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given currency not informed, then return 400 error', () => {     
        request.body.money.currency = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given currency not informed, then return error', () => {
        request.body.money.currency = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given value not informed, then return 400 error', () => {     
        request.body.money.value = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given value not informed, then return error', () => {
        request.body.money.value = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

     test ('given invalid value, then return 400 error', () => {     
        request.body.money.value = 'invalidValue';   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given invalid value, then return error', () => {
        request.body.money.value = 'invalidValue';
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given transaction type not informed, then return 400 error', () => {     
        request.body.transactionType = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given transaction type not informed, then return error', () => {
        request.body.transactionType = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given type not informed, then return 400 error', () => {     
        request.body.type = null;   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given type not informed, then return error', () => {
        request.body.type = null;
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given type not income or expense, then return 400 error', () => {     
        request.body.type = 'anyOtherType';   
        validateTransaction(request, response);
        expect(response._status).toEqual(400);
    });

    test ('given type not income or expense, then return error', () => {
        request.body.type = 'anyOtherType';
        validateTransaction(request, response);
        expect(response._json).toBeInstanceOf(BadRequestError);
    });

    test ('given transaction is valid, then go to next step', () => {
        let hasCalledNext = false;
        const next = () => { hasCalledNext = true }
        validateTransaction(request, response, next);

        expect(hasCalledNext).toBeTruthy();
    });

    class ResponseMock {
        _json = null;
        _status = 0;
        json(value) {
            this._json = value;
        };
        status(value) {
            this._status = value;
            return this;
        };
    };

});
