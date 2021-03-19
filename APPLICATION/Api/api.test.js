import api from './api'

test('test fakeAccept', () => {
	const givenObject = {ip: '192.168.0.1', port:'80'}
	api.fakeAccept(givenObject, 1000)
		.then( (res) => {
			expect(res).toMatchObject(givenObject)
		})
		.catch(err => expect(1+1).toBe(1) /*fakeAccept ne reject jamais*/)
});

test('test fakeReject', () => {
	const givenObject = {ip: '192.168.0.1', port:'80'}
	api.fakeReject(givenObject, 1000)
		.then( res => err => expect(1+1).toBe(1) /*fakeReject n'accept jamais*/).
		catch(err => {
			expect(res).toMatchObject(givenObject)
		})
});