/*VIEW DE DESPESAS*/
CREATE VIEW vw_expense AS
SELECT e.*, ec.category_description, DATE_FORMAT(e.expense_date, '%d/%m/%Y %H:%i:%s') AS formatedExpenseDate
FROM expense AS e INNER JOIN expense_category AS ec ON (ec.category_key = e.category_key)


/*VIEW PARA TRAZER DESPESAS E CATEGORIA*/
CREATE VIEW vw_exp_gp_categ AS 
SELECT e.expense_value, e.category_key, ec.category_description , e.expense_date
FROM expense AS e INNER JOIN expense_category AS ec ON (e.category_key = ec.category_key)
WHERE expense_status = 'A'