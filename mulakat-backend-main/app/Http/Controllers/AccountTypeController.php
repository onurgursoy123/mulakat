<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use Illuminate\Http\Request;

class AccountTypeController extends Controller
{
    //
    public function index()
    {
        return AccountType::with("banks","banks_interests","credits_max_amount" )->get();
    }
    public function show(AccountType $account)
    {
        return $account->load("banks","banks_interests","credits_max_amount" );
    }
    public function store(Request $request)
    {
        $account = AccountType::create($request->except("banks","banks_interests","credits_max_amount"));
        return response()->json($account, 201);
    }
    public function update(Request $request, AccountType $account)
    {
        $account->update($request->except("banks","banks_interests","credits_max_amount"));
        return response()->json($account, 200);
    }
    public function destroy(AccountType $account)
    {
        return response()->json($account->delete(), 204);
    }
}
