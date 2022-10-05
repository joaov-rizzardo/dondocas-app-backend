/*VIEW DE DESPESAS*/
CREATE VIEW vw_expense AS
SELECT e.*, ec.category_description, DATE_FORMAT(e.expense_date, '%d/%m/%Y %H:%i:%s') AS formatedExpenseDate
FROM expense AS e INNER JOIN expense_category AS ec ON (ec.category_key = e.category_key)