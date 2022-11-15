ALTER PROC [dbo].[AdminAnalytics_Monthly_Select]




AS



/*

	EXECUTE dbo.AdminAnalytics_Monthly_Select

*/









BEGIN
		DECLARE @CurrentDate DATETIME2(7)= GETUTCDATE()
			
		SELECT Users =
	(
		SELECT MAX(DATENAME(MM,DateCreated)) AS Month
			,COUNT(1) AS Count
		FROM dbo.Users
		WHERE
		DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
		GROUP BY MONTH(DateCreated)
		FOR JSON AUTO
	)
			,Orgs =
	(
		SELECT MAX(DATENAME(MM,DateCreated)) AS Month
			,COUNT(1) AS Count
		FROM dbo.Organizations
		WHERE
		DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
		GROUP BY MONTH(DateCreated)
		FOR JSON AUTO
	)
			,Revenue =

	(
		SELECT MAX(DATENAME(MM,DateCreated)) AS Month
			, SUM(TotalAmount) AS Count
		FROM dbo.Orders AS o
            INNER JOIN dbo.OrderStatus AS os
			ON o.OrderStatusId = os.Id
		WHERE
			DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
			AND
			os.Id <> 6
		GROUP BY MONTH(DateCreated)
		FOR JSON AUTO
	)
			,Orders =
	(
		SELECT MAX(DATENAME(MM,DateCreated)) AS Month
			, COUNT(1) AS Count
		FROM dbo.Orders
		WHERE
		DATEPART(YEAR, DateCreated) = DATEPART(YEAR, @CurrentDate)
		AND
		OrderStatusId <> 6
		GROUP BY MONTH(DateCreated)
		FOR JSON AUTO
	)

			,Invites =
	(
		SELECT MAX(DATENAME(MM,CreateDate)) AS Month
			, COUNT(1) AS Count
		FROM dbo.OrgInvite
		WHERE
		DATEPART(YEAR, CreateDate) = DATEPART(YEAR, @CurrentDate)
		GROUP BY MONTH(CreateDate)
		FOR JSON AUTO
	)	

END