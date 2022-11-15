ALTER PROC [dbo].[AdminAnalytics_Revenue_Select]

	AS

/*


		Execute dbo.AdminAnalytics_Revenue_Select



*/

    BEGIN

		  -- Time Frames
        DECLARE @CurrentDate DATETIME2(7)= GETUTCDATE()
				,@PrevWeek DATETIME2(7)= DATEADD(week, -1, GETUTCDATE())
				,@PrevMonth DATETIME2(7)= DATEADD(month, -1, GETUTCDATE())
				,@PrevAnnual DATETIME2(7)= DATEADD(year, -1, GETUTCDATE());
        DECLARE @TwoWeekPrior DATETIME2(7)= DATEADD(week, -2, GETUTCDATE())
				,@TwoMonthPrior DATETIME2(7)= DATEADD(month, -2, GETUTCDATE())
				,@TwoYearPrior DATETIME2(7)= DATEADD(year, -2, GETUTCDATE());

        --Revenues current and previous by time frame
        --Weekly
        DECLARE @CurrentWeeklyRev DECIMAL(12, 2) =
        (
            SELECT WeeklyRevenue = (
			Select SUM(TotalAmount)
			FROM dbo.Organizations AS org
			INNER JOIN dbo.Orders AS o
				ON o.OrganizationId = org.Id
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(o.DateCreated BETWEEN @PrevWeek AND @CurrentDate)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        )
		)
        DECLARE @PrevWeeklyRev DECIMAL(12, 2) =
        (
            SELECT SUM(TotalAmount)
            FROM dbo.Orders AS o
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(DateCreated BETWEEN @TwoWeekPrior AND @PrevWeek)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        );

        --Monthly
        DECLARE @CurrentMonthlyRev DECIMAL(12, 2) =
        (
            SELECT SUM(TotalAmount)
            FROM dbo.Orders AS o
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(DateCreated BETWEEN @PrevMonth AND @CurrentDate)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        );
        DECLARE @PrevMonthlyRev DECIMAL(12, 2 ) =
        (
            SELECT SUM(TotalAmount)
            FROM dbo.Orders AS o
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(DateCreated BETWEEN @TwoMonthPrior AND @PrevMonth)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        );

        --Annual
        DECLARE @CurrentAnnualRev DECIMAL(12, 2) =
        (
            SELECT SUM(TotalAmount)
            FROM dbo.Orders AS o
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(DateCreated BETWEEN @PrevAnnual AND @CurrentDate)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        );
        DECLARE @PrevAnnualRev DECIMAL(12, 2) =
        (
            SELECT SUM(TotalAmount)
            FROM dbo.Orders AS o
                 INNER JOIN dbo.OrderStatus AS os
				 ON o.OrderStatusId = os.Id
            WHERE(DateCreated BETWEEN @TwoYearPrior AND @PrevAnnual)
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
        );
        SELECT @CurrentWeeklyRev AS WeeklyRevenue 
               ,@CurrentMonthlyRev AS MonthlyRevenue 
               ,@CurrentAnnualRev AS AnnualRevenue 
               ,@PrevWeeklyRev AS PrevWkRevenue 
               ,@PrevMonthlyRev AS PrevMoRevenue 
               ,@PrevAnnualRev AS PrevYrRevenue 
               ,WeeklyChangePerc = CASE
                                      WHEN @PrevWeeklyRev <> 0
                                      THEN((@CurrentWeeklyRev - @PrevWeeklyRev) * 100.0) / @PrevWeeklyRev
                                      ELSE CASE
                                               WHEN @CurrentWeeklyRev = 0
                                               THEN 0
                                               ELSE NULL
                                           END
                                  END 
               ,MonthlyChangePerc = CASE
                                       WHEN @PrevMonthlyRev <> 0
                                       THEN((@CurrentMonthlyRev - @PrevMonthlyRev) * 100.0) / @PrevMonthlyRev
                                       ELSE CASE
                                                WHEN @CurrentMonthlyRev = 0
                                                THEN 0
                                                ELSE NULL
                                            END
                                   END 
               ,AnnualChangePerc = CASE
                                      WHEN @PrevAnnualRev <> 0
                                      THEN((@CurrentAnnualRev - @PrevAnnualRev) * 100.0) / @PrevAnnualRev
                                      ELSE CASE
                                               WHEN @CurrentAnnualRev = 0
                                               THEN 0
                                               ELSE NULL
                                           END
                                  END;
				
    END;