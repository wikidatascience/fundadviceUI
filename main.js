var goalMaker={
    longterm:"Long Term Goal",
    midterm:"Mid Term Goal",
    shortterm:"Short Term Goal"
}
//script for custom validation investment per month shouldnot be more than 60% of income
var customValidator = {
    name: 'sixty_percent',
    validatorFunction: function (value, $el, config, language, $form) {
        var x = $("#income").val();
        x = x * .6
        if (value > x) {
            return false
        } else {
            return true
        }
    },
    errorMessage: 'Amount Should Not Be More than 60% Of Monthly Income',
    errorMessageKey: 'badEvenNumber'
}





//main function starts here 

$(document).ready(function () {
    $('[name=tenure]').on('change', function () {
        var selR = $('[name=tenure]:checked').val();
        if (selR == 'longterm') {
            $('#Long').show();
            $('#Short').hide();
            $('#Mid').hide();
        } else if (selR == 'shortterm') {
            $('#Long').hide();
            $('#Short').show();
            $('#Mid').hide();
        } else if (selR == 'midterm') {
            $('#Long').hide();
            $('#Short').hide();
            $('#Mid').show();
        }
    })


    // when form attempts to submit it stops 
    $("#info").submit(function (e) {
        e.preventDefault();
    })
    // performing validation and calling ajax to submit data through it
    $.formUtils.addValidator(customValidator);
    $.validate({
        onSuccess: function () {
            $("#suggestionHeader").html('Find Your Suitable Fund Here')
            submitData();
        }

    })

})

function submitData() {
    $('html, body').animate({
        scrollTop: $("#resultCon").offset().top
    }, 2000);
    $("#resultCon").LoadingOverlay("show", {
        background: "rgba(238, 238, 238, 0.5)"
    });
    var myform = {};
    myform.fname = $("#fname").val();
    myform.lname = $("#lname").val();
    myform.age = $("#age").val();
    myform.email = $("#email").val();
    myform.mobile = $("#mobile").val();
    myform.age = $("#age").val();
    myform.income = $("#income").val();
    myform.loan = $("[name=loan]").val();
    myform.investments = $("[name=investments]").val();
    myform.tenure = $("[name=tenure]:checked").val();
    var selectedTenure = $("[name=tenure]:checked").val();
    myform.goal=goalMaker[selectedTenure];
    myform.investment_purpose = $("[name=" + selectedTenure + "]:checked").val();
    myform.risk = $("[name=risk]").val();
    myform.contribute = $("#contribute").val();
    console.log(myform);
    $.ajax({
        url: 'https://pure-lake-20685.herokuapp.com/login',
        method: 'POST',
        headers: {
            "Accept": "*/*"

        },
        processData: false,
        data: JSON.stringify(myform),
        contentType: false,
        mimeType: "multipart/form-data",
        success: function (data) {
            console.log(data);
            var res = parseInt(data.slice(1, data.indexOf(']'))) - 1
            renderResult(res);
            $("#resultCon").LoadingOverlay("hide", {
                background: "rgba(165, 190, 100, 0.5)"
            });
        },
        error: function (data) {
            console.log(data);
        }

    })
}
function renderResult(id) {
    $("#resultCon").html(`
    <div class="jumbotron jumbotron-fluid ms-motion-slideDownIn source" style="background :none; border:2px solid rgba(204,204,204,0.1)">
                            <img class="img-fluid" src="${resultArr[id].imageUrl}" alt="" style="height:auto;max-width:100%">
                            <div class="container">
                              <h2 class="display-1" style="color:#3C7AB7">${resultArr[id].heading}</h2>
                            <hr/>
                              <p><small>${resultArr[id].content}</small></p>
                              <table class="table">
                              <tr>
                                      <th style="font-size: large;color:green"><i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;&nbsp;Advantages</th>
                                      <th style="font-size: large;color: red"><i class="glyphicon glyphicon-thumbs-down"></i>&nbsp;&nbsp;Disadvantages</th>
                              </tr>
                              <tr>
                                  <td>${resultArr[id].advantages}</td>
                                  <td>${resultArr[id].disadvantages}</td>
                              </tr>
                          </table>
                          <hr>
                              

                              
                              <h3 style="color:#3C7AB7">Risk-Return Profile</h3>
                              <p><small>${resultArr[id].profile}</small></p>
                              <hr/>
                              <h3 style="color:#3C7AB7">Suitability For Investors</h3>
                              <p><small>${resultArr[id].suitability}</small></p>
                              <a href="${resultArr[id].link}">Click Here </a><Span>For More Details</Span>
                            </div>
                          </div>
       
    `);


}

var resultArr = [{
        id: 1,
        heading: "Thematic Funds",
        content: "Invest 100% of the assets in sectors which are related through some theme. Example-An infrastructure fund invests in power, construction, cements sectors etc.",
        imageUrl: "/assets/Thematic Funds.jpg",
        advantages: "Offer higher potential returns than equity diversified funds by taking advantage of boom in various sectors.",
        disadvantages: "High risk is involved because if the selected sectors perform poorly, the fund suffers.",
        link: "https://businessjargons.com/thematic-funds.html",
        profile: "High risk and high return category. Less aggressive than sector funds.",
        suitability: "Suitable for aggressive investors."
    },
    {
        id: 2,
        heading: "Liquid Funds",
        content: "These funds invest 100% in money market instruments, a large portion being invested in call money market.",
        imageUrl: "/assets/Liquid Funds.jpg",
        advantages: "They offer a high degree of safety as well as quick maturity. Not only do liquid funds offer higher returns than bank deposits, there’s no tax deduction at source (TDS) on them, unlike bank deposits.",
        disadvantages: "They, however, give the lowest of returns among all the classes of mutual funds.",
        link: "https://www.paisabazaar.com/mutual-funds/liquid-funds/",
        profile: "They offer the lowest return and have the lowest risk involved.",
        suitability: "They are suitable for highly risk averse investors who want to park their surplus for a short period of time."
    },
    {
        id: 3,
        heading: "Equity Diversified Funds",
        content: "Invest 100% of the capital in equities spreading across different sectors and stocks.",
        imageUrl: "/assets/Equity DIversified Funds.jpg",
        advantages: "Purely diversified across stocks and sectors.",
        disadvantages: "Limits the return potential compared to other aggressive equity funds such as sector and thematic funds.",
        link: "https://www.investopedia.com/terms/d/diversifiedfund.asp",
        profile: "=F4-Limits the return potential compared to other aggressive equity funds such as sector and thematic funds.",
        suitability: "Suitable for an equity investor seeking to invest in moderately aggressive scheme within the category of equity funds."
    },
    {
        id: 4,
        heading: "Equity-Oriented Funds",
        content: "Invest at least 65% in equities, remaining in debt.",
        imageUrl: "/assets/Equity-oriented funds.jpg",
        advantages: "A balanced fund with higher allocation to equities. Have the potential to generate higher returns than debt oriented balanced funds.",
        disadvantages: "Higher risk due to equity-market orientation.",
        link: "https://cleartax.in/s/equity-oriented-debt-fund  ",
        profile: "Due to investment in debt market, they are less aggressive than equity funds.",
        suitability: "Suitable for those, who want to invest in moderately risky fund with higher equity allocation."
    },
    {
        id: 5,
        heading: "Income Funds LT",
        content: "Typically, such funds invest a major portion of the portfolio in long-term debt papers.",
        imageUrl: "/assets/Income funds LT.jpg",
        advantages: "They offer better return than other short-term income funds in falling interest rate scenario",
        disadvantages: "In a rising interest rate scenario, income funds may not give fruitful results.",
        link: "https://www.investopedia.com/terms/i/incomefund.asp",
        profile: "Interest rate risk in these funds is higher than short-term income funds.",
        suitability: "Apt to invest in long term funds in a declining interest rate scenario."
    },
    {
        id: 6,
        heading: "FMPs",
        content: "They invest in debt papers whose maturity is in line with that of the fund",
        imageUrl: "/assets/FMPs.jpg",
        advantages: "Interest rate risk is almost nil Due to favourable tax treatment of debt funds against bank fixed deposits, post tax returns are usually higher. One can lock-in prevailing yields in the market by investing in the fund",
        disadvantages: "Illiquidity due to lock-in period",
        link: "https://cleartax.in/s/fixed-maturity-plans",
        profile: "Very low risk",
        suitability: "Suitable for fixed deposit investors willing to have better post tax returns"
    },
    {
        id: 7,
        heading: "Arbitrage Funds",
        content: "They generate income through arbitrage opportunities due to mis-pricing between cash market and derivatives market. Funds are allocated to equities, derivatives and money markets. Higher proportion (around 75%) is put in money markets, in the absence of arbitrage opportunities.",
        imageUrl: "/assets/Arbitrage Funds.jpg",
        advantages: "Due to the usage of arbitrage strategy, equity risk is negligible. Hence they can deliver superior risk-adjusted returns than other short term debt funds.",
        disadvantages: "Attractive arbitrage opportunities may not occur always. Assets are therefore allocated to money markets. This lowers the return potential. Some funds do not offer the facility of redeeming units on any working day, thus reducing the liquidity associated with the fund.",
        link: "https://www.investopedia.com/articles/investing/100515/what-exactly-are-arbitrage-mutual-funds.asp  ",
        profile: "These funds are less risky than MIPs since their exposure in equities is hedged.",
        suitability: "Suitable for conservative investors who would like to avail better returns than debt funds."
    },
    {
        id: 8,
        heading: "Debt-Oriented Funds",
        content: "Investment below 65% in equities.",
        imageUrl: "/assets/Debt-oriented funds.jpg",
        advantages: "They are less risky as compared to equity-oriented balanced schemes.",
        disadvantages: "Limited opportunities of capital appreciation due to less involvement in equities.",
        link: "https://economictimes.indiatimes.com/definition/debt-funds",
        profile: "These funds are less aggressive and hence offer lower risk and lower return than equity-oriented funds.",
        suitability: "Suitable for those, who want to invest in moderately risky fund"
    },
    {
        id: 9,
        heading: "Sector Funds",
        content: "Invest 100% of the capital in a specific sector. Example- A banking sector fund will invest in banking stocks.",
        imageUrl: "/assets/Sector Funds.png",
        advantages: "Have potential to offer higher returns than other diversified equity funds by taking advantage of boom in a particular sector.",
        disadvantages: "High risk is involved because if the sector performs poorly, the fund suffers.",
        link: "https://www.investopedia.com/terms/s/sectorfund.asp",
        profile: "Falls in high risk-high return category.",
        suitability: "Suitable for aggressive investors."
    },
    {
        id: 10,
        heading: "Gilt Funds ST",
        content: "They invest 100% of their portfolio in government securities of and T-bills.",
        imageUrl: "/assets/Gilt Funds ST.jpg",
        advantages: "Level of risk associated is very low. Advantageous to invest in short term gilt fund when the interest rates are likely to go up.",
        disadvantages: "Return potential is very low. Investing in long term gilt funds when the interest rates are predicted to fall could give poor returns.",
        link: "https://cleartax.in/s/gilt-funds",
        profile: "Since they invest in government securities and T-bills, negligible credit risk is associated with them. They lie in low risk-low return category.",
        suitability: "Good for conservative investors who would like to avail the benefits of capital safety with government security."
    },
    {
        id: 11,
        heading: "Floating Rate Funds",
        content: "Invest in short-term debt papers. Floaters invest in debt instruments which have variable coupon rate",
        imageUrl: "/assets/Floating rate funds.jpg",
        advantages: "Apt avenue during rising interest scenario, as interest rate risk is minimal",
        disadvantages: "Typically, returns on such funds are lower than long-term funds when interest rates are falling",
        link: "https://www.valueresearchonline.com/story/h2_storyview.asp?str=200481",
        profile: "Interest rate risk is very low",
        suitability: "Suitable for highly conservative investors"
    },
    {
        id: 12,
        heading: "MIPs",
        content: "Have an exposure of 70%-90% to debt and an exposure of 10%-30% to equities.",
        imageUrl: "/assets/MIPs.jpg",
        advantages: "Offer better returns than income funds due to their gain from the upside of stock market.",
        disadvantages: "Low return potential as compared to equity oriented funds",
        link: "https://www.investopedia.com/terms/m/monthly_income_plan.asp",
        profile: "They are the most aggressive among all debt funds, due to their exposure to equities.",
        suitability: "Suitable for conservative/debt investors who do not mind a small exposure to equities."
    },
    {
        id: 13,
        heading: "Gilt Funds LT",
        content: "They invest 100% of their portfolio in long-term government securities",
        imageUrl: "/assets/Gilt Funds LT.jpg",
        advantages: "Level of credit risk/ default risk is very low. Offer good returns with low risk when interest rates are falling",
        disadvantages: "Give slightly lower return that other long-term income funds which invest in corporate bonds. Returns not favourable when interest rates are rising",
        link: "https://cleartax.in/s/gilt-funds",
        profile: "Credit risk is minimal. Interest rate risk in these funds is higher than short-term income funds.",
        suitability: "Suitable for highly conservative investors (like trusts, pension funds etc.) not willing to invest beyond govt. securities"
    },
    {
        id: 14,
        heading: "Index Funds",
        content: "Track a key stock market index, like BSE Sensex or Nifty. Their portfolio mirrors the benchmark index both in terms of composition and individual stock weightages.",
        imageUrl: "/assets/Index Funds.jpg",
        advantages: "A convenient way of investing in equity index.",
        disadvantages: "Since it is more of a passive strategy of portfolio management, the returns are highly linked with index returns. In India, active funds offer higher risk-adjusted returns than index funds.",
        link: "https://www.investopedia.com/terms/i/indexfund.asp",
        profile: "Low risk-return profile amongst equity funds.",
        suitability: "Suitable for investors who wants to earn index linked returns."
    },
    {
        id: 15,
        heading: "Dividend Yield Funds",
        content: "Similar to the equity diversified funds except that they invest in companies offering high dividend yields.",
        imageUrl: "/assets/Dividend yield funds.jpg",
        advantages: "Since dividend yield stocks are less volatile such funds are associated with low level of risk. Less risky than a diversified equity fund.",
        disadvantages: "As appreciation in the value of a dividend yield stock is not very high, these funds offer lower return than equity diversified funds.",
        link: "https://www.valueresearchonline.com/story/h2_storyView.asp?str=33860",
        profile: "Low risk-return profile compared to equity diversified fund.",
        suitability: "Apt for conservative equity investor."
    },
]