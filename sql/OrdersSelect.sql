ALTER PROC [dbo].[AdminAnalytics_Orders_Select]

	AS




	/*
	
		EXECUTE dbo.AdminAnalytics_Orders_Select
	
	*/


	BEGIN
		DECLARE @CurrentDate DATETIME2(7)= GETUTCDATE()
		--Total
		SELECT TotalOrders = 
	(
		SELECT COUNT(Id)
		FROM dbo.orders
		WHERE OrderStatusId <> 6
	)
		--PrevMonth
		,PrevMonthOrders =
	(
		SELECT COUNT(Id)
		FROM dbo.Orders
		WHERE OrderStatusId <> 6
		AND
		DATEPART(month, DateCreated) = DATEPART(month, @CurrentDate) - 1
		AND DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
	)
		--CurrentMonth
		,CurrentMonthOrders =
	(
		SELECT COUNT(Id)
		FROM dbo.Orders
		WHERE OrderStatusId <> 6
		AND
		DATEPART(month, DateCreated) = DATEPART(month, @CurrentDate)
		AND DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
	)
		,CancelledOrders = 
	(
		SELECT COUNT(Id)
		FROM dbo.Orders
		WHERE OrderStatusId = 6	
	)
		,RefundedOrders = 
	(
		SELECT COUNT(Id)
		FROM dbo.Orders
		WHERE OrderStatusId = 7
	)

	END