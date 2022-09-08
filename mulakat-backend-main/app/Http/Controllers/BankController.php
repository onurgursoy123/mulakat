<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Models\BanksInterests;
use Illuminate\Http\Request;

class BankController extends Controller
{
    //
    public function index()
    {
        return Bank::with("account_types", "banks_interests", "credits_max_amount")->get();
    }

    public function show(Bank $bank)
    {
        return $bank->load("account_types", "banks_interests", "credits_max_amount");
    }

    public function store(Request $request)
    {
        $bank = Bank::create($request->only("name","banks_interests"));
        foreach ($request->bank_isterests as $key => $value) {
            $bank->banks_intrests()->createMany($value);
        };
        $bank->credits_max_amout()->createMany($request->credits_max_amount);
        return response()->json($bank->load("banks_interests","credits_max_amount"), 201);
    }

    public function update(Request $request, Bank $bank)
    {
        $bank->update($request->except("account_types", "banks_interests", "credits_max_amount"));
        return response()->json($bank, 200);
    }
}
