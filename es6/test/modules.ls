module Profile
  # module code
  export firstName = 'David'
  export lastName = 'Belle'
  export default year = 1973
}

module ProfileView
  import Profile {firstName, lastName, year}

  setHeader: (element) ->
    element.textContent = firstName + ' ' + lastName
  }
}