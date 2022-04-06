
function selectedCompanies(data) {
    return {
        type: 'selectedCompanies',
        data: data,
    }
}

function selectedPage(data) {
    return {
        type: 'selectedPage',
        data: data,
    }
}
function setCustomerBranchChoice(data) {
    return {
        type: 'setCustomerBranchChoice',
        data: data,
    }
}

export {selectedCompanies,selectedPage,setCustomerBranchChoice}