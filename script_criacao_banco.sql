CREATE TABLE transacao (
	id serial primary key,
	titulo varchar(100),
	valor real,
	tipo_da_transacao varchar(10),
	categoria varchar(50),
	data_da_transacao date default current_date
);

drop table transacao;
